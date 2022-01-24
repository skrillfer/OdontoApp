import React from 'react';
import DataTable from 'react-data-table-component';

import EditSeat from '../edit-seat/edit-seat.component';

import PopoverGeneric from '../popover-generic/popover-generic.component';

import './datatable.styles.css';

const SampleExpandedComponent = ({ data }) => (
    <div className='div-expanded-row-report'>
      <p>
        {`Nombre: ${data.name}`}
        <br/>
        {`Numero Boleta: ${data.no_document}`}
        <br/>
        {`Carnet/Colegiado: ${data.register_number}`}
        <br/>
        {`Universidad: ${data.university}`}
        <br/>
        {`Email del comprador: ${data.email}`}
        <br/>
        {`Precio: ${data.precio}`}
      </p>
      
    </div>
  );
  
const FilterComponent = ({ filterText, onFilter, onClear, name, placeholder }) => (
  <>
    <input className='TextFieldStyle' id="search" name={name}  type="text" placeholder={placeholder} value={filterText} onChange={onFilter} />
    <button className='ClearButtonStyle etPcIV' name={name} onClick={onClear}>X</button>
  </>
);

const Export = ({ onExport }) => (
    <>
    <button className='etPcIV' onClick={e => onExport(e.target.value)}>Descargar Excel</button>
    </>
);

let payloadInit={payloadEdit:null,payloadDelete:null}
const getColumns = (setPayloadAction) =>{ return [
  {
    name:'',
    button:true,
    cell: (row)=><> <button onClick={()=>setPayloadAction({...payloadInit,payloadEdit:row})}  className='btn-report-circle edit'><span role='img' aria-label='edit'>&#9997;</span></button>
                    <span
                    >
                    <PopoverGeneric 
                          key={`Popover${row.seccion_prev}${row.fila}${row.columna}${row.curso}`} 
                          rowname = {row.fila} 
                          column  = {row.columna} 
                          section = {row.seccion_prev}
                          course  = {row.curso}
                          disablePopover={false}
                          >  
                          <span  role='img' aria-label='delete'
                                  className='btn-report-circle delete' 
                          >
                            &#10006;       
                          </span>   
                          
                    </PopoverGeneric>
                    
                    </span>
                 </>
  },
  {
    name: 'Fila',
    selector: 'fila',
    sortable: true,
  },
  {
    name: 'Columna',
    selector: 'columna',
    sortable: true,
  },
  {
    name: 'Curso',
    selector: 'curso',
    sortable: true,
  },
  {
    name: 'Seccion',
    selector: 'seccion',
    sortable: true,
  },
];}

const customStyles = {
    headCells: {
      style: {
        fontSize   : '18px',
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    }
  };

function downloadCSV(array,data) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array,data);
    if (csv == null) return;
  
    const filename = 'export.csv';
  
    //if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,\ufeff${csv}`;
    //}
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

function convertArrayOfObjectsToCSV(array,data) {
    let result;
  
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);
  
    result = '';
    result += keys.join(columnDelimiter);
    result = result.replace('name','nombre');
    result = result.replace('register_number','carnet_colegiado');
    result = result.replace('university','universidad');
    result = result.replace('no_document','boleta');
    result += lineDelimiter;
  
    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
  
        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });
  
    return result;
}
  


let initialStateFilter={
  filterTextByColumn : '',
  filterTextByRow : '',
  filterTextBySection : '',
  filterTextByCourse : '',
  filterTextByName : '',
  filterTextByNoDoc : '',
  filterTextByUniversity : '',
  filterTextByregisterNumber : ''
};

const removeNullValues = (seats_solds) =>{
  return seats_solds.map(seat=>{
    Object.keys(seat).forEach(key=>{
      if(seat[key]===null){
        seat[key]='';
      }
    });
    return seat;
  });
}
const BasicTable = ({seats_solds}) => {
  const [filterTexts, setFilterTexts] = React.useState({
    ...initialStateFilter
  });
  const [payloadAction,setPayloadAction] = React.useState({payloadEdit:null,payloadDelete:null});
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const actionsMemo = <Export onExport={() => downloadCSV(seats_solds, seats_solds)} />;
  seats_solds = removeNullValues(seats_solds);
  const filteredItems = seats_solds.filter(
      item => 
        item.seccion.toUpperCase().includes(filterTexts.filterTextBySection.toUpperCase()) &&
        item.curso.toUpperCase().includes(filterTexts.filterTextByCourse.toUpperCase()) &&
        item.fila.toUpperCase().includes(filterTexts.filterTextByRow.toUpperCase()) &&
        item.columna.toString().toUpperCase().includes(filterTexts.filterTextByColumn.toUpperCase()) &&
        item.name.toString().toUpperCase().includes(filterTexts.filterTextByName.toUpperCase()) &&
        item.no_document.toString().toUpperCase().includes(filterTexts.filterTextByNoDoc.toUpperCase()) &&
        item.university.toString().toUpperCase().includes(filterTexts.filterTextByUniversity.toUpperCase()) &&
        item.register_number.toString().toUpperCase().includes(filterTexts.filterTextByregisterNumber.toUpperCase())
    );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = (event) => {
      if (filterTexts[event.target.name]) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterTexts({
          ...filterTexts,
          [event.target.name]: ''
        });
      }
    };
    
    return (
            <div className='container'>
              {payloadAction.payloadEdit?
                <>
                  <EditSeat seatData={payloadAction.payloadEdit} setPayloadAction={setPayloadAction}/>
                </>
               :payloadAction.payloadDelete?
               <div></div>:
               null 
              }
              <div className='row justify-content-between'>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByregisterNumber`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar x colegiado/carnet`} 
                      filterText={filterTexts.filterTextByregisterNumber} 
                    />  
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByName`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por nombre`} 
                      filterText={filterTexts.filterTextByName} 
                    />  
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                      <FilterComponent 
                        name ={`filterTextByNoDoc`}  
                        onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                        onClear={handleClear}
                        placeholder={`filtrar por boleta`} 
                        filterText={filterTexts.filterTextByNoDoc} 
                      />
                  </div>
                </div> 
                <div className='col-auto'>
                  <div className='row'>
                      <FilterComponent 
                        name ={`filterTextByUniversity`}  
                        onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                        onClear={handleClear}
                        placeholder={`filtrar por universidad`} 
                        filterText={filterTexts.filterTextByUniversity} 
                      />
                  </div>
                </div>  
              </div>
              <div className='row justify-content-between'>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByRow`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por fila`} 
                      filterText={filterTexts.filterTextByRow} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByColumn`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por columna`} 
                      filterText={filterTexts.filterTextByColumn} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByCourse`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por curso`} 
                      filterText={filterTexts.filterTextByCourse} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextBySection`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por seccion`} 
                      filterText={filterTexts.filterTextBySection} 
                    />
                  </div>
                </div>
            </div>
          </div>
            );
  }, [filterTexts, resetPaginationToggle,payloadAction]);

  return (
    <DataTable
      columns={getColumns(setPayloadAction)}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      actions={actionsMemo}
      customStyles={customStyles}
      expandableRows
      expandableRowsComponent={<SampleExpandedComponent data={seats_solds} />}


    /> 
  );
  
  
  
};
export default BasicTable;