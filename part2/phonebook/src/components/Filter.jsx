const Filter = ({ filter, handleFilterChange}) => {
  return <input value={filter} onChange={handleFilterChange} placeholder="Filter names..." />
}

export default Filter