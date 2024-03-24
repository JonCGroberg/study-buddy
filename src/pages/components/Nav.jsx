import "../styles/styles.css"

const Nav = ({ title = "" }) => {
	return (
		<nav className="navbar navbar-expand-lg bg-white shadow-sm border">
			<div className="container-fluid px-5">
				<a className="navbar-brand" href="/">
					<img src="/image.png"></img>
					<span className=" px-3 text-primary  fw-bold    ">Study Buddy</span>
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
					<form className="d-flex w-75 text-center  px-5 mx-5 " role="search">
						<h6 className="text-center w-100 fw-bold">
							{title}
						</h6>
						{/* <input`
							className="form-control me-2 "
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-dark " type="submit">
							Search
						</button> */}
					</form>
					<button className="btn btn-primary "> New Study Session</button>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
