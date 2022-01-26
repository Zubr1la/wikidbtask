import React, {useState} from 'react';
import {useFilters, useSortBy, useTable,usePagination} from "react-table";
import Button from "react-bootstrap/Button";
import ArticleDataComponent from "../Components/ArticleDataComponent";


function ArticleTableFunction({array}) {

    const[choice, setChoice] = useState(0);

    const columnData = React.useMemo(
        () => [
            array.map((article,index)=>{
                return (
                    {
                        col1: article.articleType,
                        col2: article.articleTitle,
                        col3: article.id,
                        col4: article.postedDate,
                        col5: <Button variant="outline-dark" size='sm' block="true" onClick={()=>setChoice(article.id)}>Show article</Button>
                    }
                )
            })
        ],[]
    );

    const data = columnData[0];

    function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id },}) {

        const options = React.useMemo(() => {
            const options = new Set();
            preFilteredRows.forEach(row => {
                options.add(row.values[id])
            });
            return [...options.values()]
        }, [id, preFilteredRows]);

        return (
            <select
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option===1 ? "Technical" : option ===2 ? "Support": "Template"}
                    </option>
                ))}
            </select>
        )
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Type',
                accessor: 'col1',
                Cell: ({ value }) => (value === 1 ? "Technical" : value ===2 ? "Support": "Template"),
                Filter: SelectColumnFilter,
                filter: 'exactTextCase',

            },
            {
                Header: 'Title',
                accessor: 'col2',
            },
            {
                Header: 'ID',
                accessor: 'col3',
            },
            {
                Header: 'Date',
                accessor: 'col4',
            },
            {
                Header: 'Data',
                accessor: 'col5',
            },
        ],
        []
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },

    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination,
    );


    return (
        <div className="row">

            <div className="col-lg-6">
                <table className="table table-striped" {...getTableProps()}>
                    <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column, index) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? '▼'
                                                        : '▲'
                                                    : ''}
                                              </span>
                                            {index===0 ? <div>{column.canFilter ? column.render('Filter'): null}</div>:null}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {console.log(cell)}
                                                    {cell.column.Header==="Date"? new Date(parseInt(cell.value)).toDateString(): cell.render('Cell') }
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <span>
                      Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>

                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>


            </div>


           <div className="col-lg-6">
               {choice===0 ? null: <ArticleDataComponent articleID={choice}/>}
           </div>
            
        </div>
    )
}

export default ArticleTableFunction