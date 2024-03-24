import { useEffect, useState } from "react";

const Search = () => {
	let [options, setOptions] = useState([]);
	let [searchResults, setSearchResults] = useState([]);
	let [search, setSearch] = useState([]);

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
		<div className="container mt-5">
			<div className="">
				<input
					type="text"
					className="form-control"
					value={search}
					placeholder="Start Searching"
					onChange={(e) => {
						setSearch(e.target.value);
                        setSearchResults(options.filter(option=>option.code.includes(code)))
					}}
				/>
			</div>

			<select size={5} className=" form-select " multiple>
				{searchResults.map((option, index) => (
					<option key={index} value={index}>
						{option.code}
					</option>
				))}
			</select>
		</div>
	);
};

export default Search;
