export default function Jumbotron({filterText,setFilterText}) {
    return (
<div class="container-fluid">
<div class="jumbotron">
    <h2>Need stay on vacation?</h2>
    <div class="container-fluid input-group mb-3 searchLine" id="jumbElements">
        <form action="">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 list-group-horizontal-lg list-group-horizontal-md" id="sbItems">
                <li class="nav-item">
                    <Search
                        filterText={filterText}
                        onFilterChange={setFilterText}
                    />
                </li>
                
                <li class="nav-item">
                    <input class="form-control form-round" id="guest" type="text" placeholder="Guests" />
                </li>
                <li class="nav-item">
                    <button class="btn btn-danger" type="button" id="searchBtn">Search</button>
                </li>
            </ul>
        </form>
    </div>
</div>
</div>
    )
}

function Search({ filterText, onFilterChange }) {
    return (
        <input class="form-control form-round" id="searchDest" type="search" placeholder="Search Destination" value={filterText} onChange={(e) => onFilterChange(e.target.value)} />
    );
}