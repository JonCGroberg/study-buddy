const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-white">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Study Buddy
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mb-2  mb-lg-0"></ul>
					<form className="d-flex w-75 px-5 mx-5 " role="search">
						<input
							className="form-control me-2 "
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-dark " type="submit">
							Search
						</button>
					</form>
                    <button className="btn btn-primary "> New Study Sessions</button>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
