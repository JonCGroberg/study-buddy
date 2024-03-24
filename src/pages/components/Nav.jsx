import "../styles/styles.css"

const Nav = ({ title = "", bookable = true }) => {
	return (
		<nav className="navbar navbar-expand-lg bg-white shadow-sm border">
			<div className="container-fluid px-3">
				<a className="navbar-brand" href="/">
					<img src="/image.png"></img>
					<span className=" px-3 text-primary  fw-bold    ">StudyBuddies</span>
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
					<div className="d-flex flex-grow-1 text-center px-5 mx-5 ">
						<h6 className="text-center w-100 fw-bold">
							{title}
						</h6>
					</div>
                    { bookable ? <a href="/book" className="btn btn-primary me-0"> New Study Session</a>:<div className="px-5"></div>}
                    <a href="/api/auth/signout" className="btn btn-outline-secondary  ms-2">Signout</a>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
