import { useEffect, useState } from "react";

const Search = ({ courses = [] }) => {
	let [options, setOptions] = useState([]);
	let [searchResults, setSearchResults] = useState([]);
	let [search, setSearch] = useState([]);
	let [dropdown, setDropdown] = useState(true);
	let [selected, setSelected] = useState(courses);
	let [selection, setSelection] = useState();

	console.log(courses);

	useEffect(() => {
		fetch("/courses.json", { method: "GET" })
			.then((res) => res.json())
			.then((data) => {
				setOptions(data);
			});
		// async function filterCourses(code) {
		// 	return courses.filter((course) => course.code.includes(code));
		// }
	}, []);

	// setSearchResults([]);

	return (
		<div className="container-fluid mt-5 ms-4 ps-4">
			<div className="row px-5 ms-0 me-0">
				<div
					className="w-100"
					// onFocus={() => setDropdown(true)}
					// onBlur={() => setDropdown(false)}
				>
					<div>
						<input
							type="text"
							className="form-control"
							value={search}
							placeholder="Start Searching"
							onChange={(e) => {
								setSearch(e.target.value.toUpperCase());
								if (e.target.value) {
									setDropdown(true);
									setSearchResults(
										options
											.filter((option) =>
												option.code.includes(e.target.value.toUpperCase())
											)
											.slice(0, 15)
									);
								} else {
									setDropdown(false);
									setSearchResults();
								}
							}}
						/>
						{dropdown ? (
							<select
								// value={selected}
								onChange={(e) => {
									const newSelected = [...selected, e.target.value];
									window.location.replace("/search/" + newSelected.join("&"));
									setSelected(newSelected);
								}}
								className=" form-select"
							>
								{searchResults.map((option, index) => (
									<option key={index} value={option.code}>
										{option.code}
									</option>
								))}
							</select>
						) : (
							""
						)}
					</div>
				</div>
				<div className="col">
					<div className=" align-content-center pt-4 px-2">
						{selected.map((code, index) => (
							<button
								key={index}
								onClick={() => {
									const filtered = selected.filter((elem) => elem != code);
									setSelected(filtered);
									window.location.replace("/search/" + filtered.join("&"));
								}}
								className="btn btn-sm btn-light col mx-1 ps-2 fw-light shadow-sm  "
								style={{ border: "1px solid " + getCourseColor(code) }}
							>
								{code}
								<span>
									<i className="bi bi-x ps-1"></i>
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

function stringToHash(string) {
	let hash = 0;
	if (string.length == 0) return hash;

	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = (hash << 6) - hash + char;
		hash = hash & hash;
	}
	return hash;
}

function getCourseColor(course) {
	const colors = [
		"#FF2E2E",
		"#FFA14A ",
		"#F5DF14",
		"#60DD5E",
		"#3ABE6F",
		"#39BCBC",
		"#3F7BC2",
		"#5E2A92",
		"#BC64C4",
		"#ED6890"
	];
	return colors[stringToHash(course) % colors.length];
}

export default Search;
