import { useState, useEffect } from "react";

function Form() {
	let [name, setName] = useState([]);
	let [description, setDescription] = useState([]);
	let [location, setLocation] = useState([]);
	let [selectedGroupSize, setSelectedGroupSize] = useState(null);
	let [selectedStartDate, setSelectedStartDate] = useState([null]);
	let [selectedStartTime, setSelectedStartTime] = useState([null]);
	let [selectedEndTime, setSelectedEndTime] = useState([null]);
	let [selectedEndDate, setSelectedEndDate] = useState([null]);
	let [options, setOptions] = useState([]);
	let [searchResults, setSearchResults] = useState([]);
	let [search, setSearch] = useState([]);
	let [dropdown, setDropdown] = useState(false);
	let [selected, setSelected] = useState([]);
	let [courseName, setCourseName] = useState();

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

	return (
		<form
			className="card w-75 mx-auto p-5"
			onSubmit={(e) =>
				handleSubmit(e, {
					name,
					description,
					location,
					selectedEndDate,
					selectedEndTime,
					selectedGroupSize,
					selectedStartDate,
					selectedStartTime,
					selected,
					courseName
				})
			}
		>
			<div className="card-body">
				{" "}
				<div>
					<label> Course Name </label>
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
							defaultValue={[]}
							onChange={(e) => {
								const parsedData = JSON.parse(e.target.value);
								// console.log(parsedData.code, parsedData.name);
								setSelected(parsedData.code);
								setCourseName(parsedData.name);
							}}
							className=" form-select"
						>
							<option selected="selected"> Select Class</option>
							{searchResults.map((option, index) => (
								<option key={index} value={JSON.stringify(option)}>
									{option.code + " -  " + option.name}
								</option>
							))}
						</select>
					) : (
						""
					)}
				</div>
				<div className="my-3">
					<label for="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						className="form-control"
						placeholder="Enter Study Session Name"
					/>
				</div>
				<div className="mb-3">
					<label for="description">Description</label>
					<textarea
						className="form-control"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						rows={3}
						aria-describedby="descriptionHelp"
					></textarea>
					{/* <div id="descriptionHelp" className="form-text">
                        Add any useful info here!
                    </div> */}
				</div>
				<div className="mb-3">
					<label for="location" className="form-label">
						Location
					</label>
					<input
						type="text"
						className="form-control"
						value={location}
						onChange={(e) => {
							setLocation(e.target.value);
						}}
						required
						placeholder="Enter location"
						aria-describedby="groupLocationHelp"
					/>
					{/* <div id="groupLocationHelp" className="form-text">
                        Be as specific as possible!
                    </div> */}
				</div>
				<div className="mb-3">
					<label for="size" className="form-label">
						Group Size
					</label>
					<select
						className="form-select"
						value={selectedGroupSize}
						required={true}
						onChange={(e) => setSelectedGroupSize(e.target.value)}
					>
						<option value="4">Small (4)</option>
						<option value="8" selected>
							Medium (8)
						</option>
						<option value="16">Large (16)</option>
						<option value="-1">Unlimited</option>
					</select>
				</div>
				<div className="row mb-3">
					<label className="form-label">Start</label>
					<div className="col">
						<select
							className="form-select"
							value={selectedStartDate}
							required={true}
							onChange={(e) => setSelectedStartDate(e.target.value)}
						>
							{getWeekDates().map((date, index) => (
								<option value={index}>
									{date.toLocaleString("en-us", { weekday: "long" }) +
										", " +
										date.toLocaleString("en-us", { month: "long" }) +
										" " +
										date.getDate()}
								</option>
							))}
						</select>
					</div>
					<span className="col-auto">
						<label className="form-label">@</label>
					</span>
					<div className="col">
						<select
							className="form-select"
							value={selectedStartTime}
							onChange={(e) => setSelectedStartTime(e.target.value)}
							required={true}
						>
							{[...Array(24 * 4).keys()].map((index) => (
								<option value={index}>
									{getTimeBlock(index).toLocaleTimeString("en-US")}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="row mb-3">
					<label className="form-label">End</label>
					<div className="col">
						<select
							className="form-select"
							value={selectedEndDate}
							onChange={(e) => setSelectedEndDate(e.target.value)}
							required={true}
						>
							{getWeekDates().map((date, index) => (
								<option value={index}>
									{date.toLocaleString("en-us", { weekday: "long" }) +
										", " +
										date.toLocaleString("en-us", { month: "long" }) +
										" " +
										date.getDate()}
								</option>
							))}
						</select>
					</div>
					<div className="col-auto">
						<label className="form-label">@</label>
					</div>
					<div className="col">
						<select
							className="form-select"
							value={selectedEndTime}
							onChange={(e) => setSelectedEndTime(e.target.value)}
							required={true}
						>
							{[...Array(24 * 4).keys()].map((index) => (
								<option value={index}>
									{getTimeBlock(index).toLocaleTimeString("en-US")}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="pt-4">
					<button
						id="bookButton"
						type="submit"
						className="btn btn-primary mx-auto w-100"
					>
						Book
					</button>
				</div>
			</div>
		</form>
	);
}

function getWeekDates() {
	const start = new Date();
	const dates = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(start.getDate() + i);
		dates.push(date);
	}
	return dates;
}

function getTimeBlock(i) {
	const date = new Date();
	date.setHours(Math.floor(i / 4));
	date.setMinutes((i % 4) * 15);
	date.setSeconds(0);
	return date;
}

function getUnixTimestampFromInputs(day, time) {
	if (!day || !time) return undefined;
	const date = getTimeBlock(time);
	date.setDate(Number(date.getDate()) + Number(day));
	return Math.floor(date.getTime() / 1000);
}

function handleSubmit(
	e,
	{
		name = "",
		description = "",
		location,
		selectedEndDate,
		selectedEndTime,
		selectedGroupSize,
		selectedStartDate,
		selectedStartTime,
		selected,
		courseName
	}
) {
	e.preventDefault();
	e.stopPropagation();
	const start = getUnixTimestampFromInputs(
		selectedStartDate,
		selectedStartTime
	);
	const end = getUnixTimestampFromInputs(selectedEndDate, selectedEndTime);

	const studyGroup = {
		course: selected,
		course_title: courseName,
		name,
		description,
		start,
		end,
		location,
		max_buddies: selectedGroupSize
	};

	fetch("/api/book", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(studyGroup)
	}).then((data) => {
		console.log(data);
		window.location.replace("/");
	});
}

export default Form;
