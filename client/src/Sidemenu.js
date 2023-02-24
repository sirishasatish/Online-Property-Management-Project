import {Link, useNavigate} from 'react-router-dom';
export default function Sidemenu({ page, props, setCategoryFilter, setCityFilter }) {
    const navigate = useNavigate();
    const localstorage_user = JSON.parse(localStorage.getItem('user'));

    if(localstorage_user != null){
        var userId = localstorage_user.user_id}
    if(userId)
    {
    var path_favorites = '/favorites/'+localstorage_user.user_id;
    var path_reservation = '/reservations/'+localstorage_user.user_id;
    }
    else{
        // navigate('/login')
    }
    var city = new Set()
    var category = new Set()
    var city_names = []
    var category_names = []
    props.forEach(p => {
        city.add(p.city)
    });
    props.forEach(cat => {
        category.add(cat.category)
    });

    const handleCategoryFilter = (e) => {
        if (e.target) {
            let textContent = e.target.textContent;
            setCategoryFilter(textContent)
            //console.log(e.target.textContent)
        }
    }

    const handleCityFilter = (e) => {
        let textContent = e.target.textContent;
        setCityFilter(textContent)
        console.log(e.target.textContent)

    }

    category.forEach((c) => {
        category_names.push(<li ><a class="dropdown-item" href="#">{c}</a></li>)
    });

    city.forEach((c) => {
        city_names.push(<li><a class="dropdown-item" href="#">{c}</a></li>)
    });

if(page==undefined){
    return (
        <div class="col-md-3" id="side-menu">
            <ul class="nav nav-pills flex-column mb-auto" id="sideItems" style={{ "display": "flex" }}>
                <li class="nav-item" style={{ "background-color": "lightgray", "padding": "5px" }} >
                    My Profile
                </li>
                <br />
                <li>
                    {/* <a href={url} class="nav-link link-dark"> */}
                    <Link to={path_favorites}> My Favorites </Link>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                    </a> */}
                </li>
                <br />
                <li>
                    {/* <a href={url} class="nav-link link-dark"> */}
                    <Link to={path_reservation}> My Reservations </Link>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                    </a> */}
                </li>
                <br />
                <li class="nav-item" style={{ "background-color": "lightgray", "padding": "5px" }} >
                    Filter By
                </li>
                <br />

                <div class="btn-group">
                    <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        City
                    </button>
                    <ul class="dropdown-menu" onClick={handleCityFilter}>
                        {city_names}
                    </ul>
                </div>
                <br />
                <div class="btn-group">
                    <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </button>
                    <ul class="dropdown-menu" onClick={handleCategoryFilter}>
                        {category_names}
                    </ul>
                </div>

            </ul>
        </div>

    )}
    else if(page=="hostpage"){
        return (
            <div class="col-md-3" id="side-menu">
                <ul class="nav nav-pills flex-column mb-auto" id="sideItems" style={{ "display": "flex" }}>
                    {/* <li class="nav-item" style={{ "background-color": "lightgray", "padding": "5px" }} >
                        MyProfile
                    </li>
                    <br /> */}
                    <li>
                        {/* <a href={url} class="nav-link link-dark"> */}
                        <Link to={'/addForm'}> <button type="submit" class = "btn btn-danger">Add a property</button> </Link>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                            </svg>
                        </a> */}
                    </li>
                   
                </ul>
            </div>
    
        )
    }
    else{
        return (
            <div class="col-md-3" id="side-menu">
                <ul class="nav nav-pills flex-column mb-auto" id="sideItems" style={{ "display": "flex" }}>
                    <li class="nav-item" style={{ "background-color": "lightgray", "padding": "5px" }} >
                        My Profile
                    </li>
                    <br />
                    <li>
                        {/* <a href={url} class="nav-link link-dark"> */}
                        <Link to={path_favorites}> My Favorites </Link>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                            </svg>
                        </a> */}
                    </li>
                    <br />
                    <li>
                        {/* <a href={url} class="nav-link link-dark"> */}
                        <Link to={path_reservation}> My Reservations </Link>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
                                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                            </svg>
                        </a> */}
                    </li>
                    
                </ul>
            </div>
    
        )
    }
}

