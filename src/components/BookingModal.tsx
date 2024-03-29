import {
	useState,
	useEffect,
	type ChangeEvent,
	type FormEvent,
	type Key
} from "react";
import {
	getWeekDates,
	getTimeBlock,
	getUnixTimestampFromInputs
} from "../utils/time";

type Booking = {
	endDate: string;
	endTime: number;
	startDate: string;
	startTime: number;
	courseCode: string;
	courseName: string;
	description: string;
	location: string;
	groupSize: number;
	name: string;
};

const BookingModal = () => {
	return (
		<div
			className="modal fade "
			id={"modal-book"}
			tabIndex={-1}
			aria-labelledby={"modal-label-book"}
			aria-hidden="true"
		>
			<div className="modal-dialog ">
				<div className="modal-content rounded-1">
					<div className="modal-header">
						<h1 className="modal-title fs-5 px-2" id={"modal-label-book"}>
							Create a New Study Session
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="model-body p-2 pt-0">
						<Form />
					</div>
				</div>
			</div>
		</div>
	);
};

const Form = () => {
	let [inputs, setInputs] = useState<Booking | null>(null);
	let [options, setOptions] = useState(null);
	let [searchResults, setSearchResults] = useState(null);
	let [search, setSearch] = useState(null);
	let [dropdown, setDropdown] = useState(false);

	console.log("booking modal");

	//gather the list of all courses
	useEffect(() => {
		fetch("/courses.json", { method: "GET" })
			.then((res) => res.json())
			.then((data) => {
				setOptions(data);
			});
	}, []);

	// Unless we give name or value, it infers this data from the event
	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
		name?: string,
		value?: string
	) => {
		if (!name) name = event.target.name;
		if (!value) value = event.target.value;
		setInputs((values: Booking | null) => ({ ...values, [name]: value }));
	};

	return (
		<form className="modal-body" onSubmit={(e) => handleSubmit(e, inputs)}>
			<div className="card-body pt-3">
				<div>
					<label className=" form-label "> Course Name </label>
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
										.filter((option: { code: string | string[] }) =>
											option.code.includes(e.target.value.toUpperCase())
										)
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
								const parsedData = JSON.parse(e.target.value);
								handleChange(e, "courseCode", parsedData.code);
								handleChange(e, "courseName", parsedData.name);
							}}
							className=" form-select"
						>
							<option defaultValue={[]}> Select Class</option>
							{searchResults.map(
								(option: { code: string; name: string }, index: Key) => (
									<option key={index} value={JSON.stringify(option)}>
										{option.code + " -  " + option.name}
									</option>
								)
							)}
						</select>
					) : (
						""
					)}
				</div>

				<div className="my-3">
					<label className="form-label w-100">
						Study Group Name <span className="text-secondary">(optional)</span>
					</label>
					<input
						name="name"
						value={inputs?.name || ""}
						onChange={handleChange}
						className="form-control"
						placeholder="Enter Study Session Name"
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="location" className="form-label">
						{" "}
						Location{" "}
					</label>
					<input
						className="form-control"
						name="location"
						value={inputs?.location || ""}
						onChange={handleChange}
						required
						placeholder="Enter location"
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="size" className="form-label">
						Group Size
					</label>
					<select
						name="groupSize"
						className="form-select"
						value={inputs?.groupSize}
						required
						onChange={handleChange}
					>
						<option value="">Select Group Size</option>
						<option value="4">Small (4)</option>
						<option value="8">Medium (8)</option>
						<option value="16">Large (16)</option>
						<option value="-1">Unlimited</option>
					</select>
				</div>

				<div className="row mb-3">
					<label className="form-label">Start</label>
					<div className="col">
						<select
							name="startDate"
							className="form-select"
							value={inputs?.startDate}
							required
							onChange={handleChange}
						>
							<option value="">Select Start Date</option>
							{getWeekDates().map((date, index) => (
								<option value={index} key={index}>
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
							name="startTime"
							className="form-select"
							value={inputs?.startTime}
							onChange={handleChange}
							required
						>
							<option value="">Select Start Time</option>
							{[...Array(24 * 4).keys()].map((index) => (
								<option value={index} key={index}>
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
							name="endDate"
							className="form-select"
							value={inputs?.endDate}
							onChange={handleChange}
							required
						>
							<option value="">Select End Date</option>
							{getWeekDates().map((date, index) => (
								<option value={index} key={index}>
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
							name="endTime"
							className="form-select"
							value={inputs?.endTime}
							onChange={handleChange}
							required
						>
							<option value="">Select End Time</option>
							{[...Array(24 * 4).keys()].map((index) => (
								<option value={index} key={index}>
									{getTimeBlock(index).toLocaleTimeString("en-US")}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="mb-3">
					<label className="form-label">
						Description <span className="text-secondary">(optional)</span>
					</label>
					<textarea
						name="description"
						value={inputs?.description || ""}
						onChange={handleChange}
						className="form-control"
						placeholder="Begin Typing to add a description"
						rows={3}
					/>
				</div>

				<div className="pt-3">
					<button
						id="bookButton"
						type="submit"
						className="btn btn-primary mx-auto w-100"
					>
						Create
					</button>
				</div>
			</div>
		</form>
	);
};

function handleSubmit(
	e: FormEvent<HTMLFormElement>,
	{
		endDate,
		endTime,
		startDate,
		startTime,
		courseCode,
		courseName,
		description,
		location,
		groupSize,
		name
	}: Booking
) {
	e.preventDefault();

	const start = getUnixTimestampFromInputs(startDate, startTime);
	const end = getUnixTimestampFromInputs(endDate, endTime);

	const studyGroup = {
		course: courseCode,
		course_title: courseName,
		name: name || "",
		description: description || "",
		start,
		end,
		location,
		max_buddies: groupSize
	};

	console.log(studyGroup);

	fetch("/api/book", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(studyGroup)
	}).then((res) => {
		if (res.ok) window.location.replace("/");
		else console.log(res);
	});
}

export default BookingModal;
