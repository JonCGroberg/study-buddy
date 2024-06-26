import { useEffect, useState } from "react";

import getCourseColor from "../utils/color.ts";

const Search = ({ courses = [] }) => {
	let [options, setOptions] = useState([]);
	let [searchResults, setSearchResults] = useState([]);
	let [search, setSearch] = useState("");
	let [dropdown, setDropdown] = useState(false);
	let [selected, setSelected] = useState(courses);

	useEffect(() => {
		fetch("/courses.json", { method: "GET" })
			.then((res) => res.json())
			.then((data) => {
				setOptions(data);
			});
	}, []);

	return (
		<div className="mt-5 ms-0 ps-0 px-md-4 px-md-3 ">
			<div className="row px-0 ms-0 me-0 px-sm-0 px-md-4">
				<div className="w-100">
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
											.filter((option) => {
												const upper = e.target.value.toUpperCase();
												return (
													(option.code.includes(upper) ||
														option.name.toUpperCase().includes(upper)) &&
													!courses.includes(option.code)
												);
											})
											.slice(0, 15)
									);
								} else {
									setDropdown(false);
									setSearchResults([]);
								}
							}}
						/>
						{dropdown ? (
							<select
								defaultValue={[]}
								onChange={(e) => {
									if (!e.target.value) return;
									if (selected.includes(e.target.value)) return;

									const newSelected = [...selected, e.target.value];
									window.location.replace(
										"/search/" + newSelected.join("&") + "?lastSearch=" + search
									);
									setSelected(newSelected);
								}}
								className=" form-select"
							>
								<option selected> Select Result</option>
								{searchResults.map((option, index) => (
									<option key={index} value={option.code}>
										{option.code + " -  " + option.name}
									</option>
								))}
							</select>
						) : (
							""
						)}
					</div>
				</div>
				<div className="col">
					<div className=" align-content-center pt-4">
						{selected.map((code, index) => (
							<button
								key={index}
								onClick={() => {
									const filtered = selected.filter((elem) => elem != code);
									setSelected(filtered);
									window.location.replace(
										filtered.length == 0
											? "/"
											: "/search/" + filtered.join("&") + "?=" + search
									);
								}}
								className="btn btn-sm btn-light col mx-1 ps-3 fw-light shadow-sm  "
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

export default Search;
