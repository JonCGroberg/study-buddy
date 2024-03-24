function Form() {
	return (
		<form>
			<div className="mb-3">
				<label for="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					name="name"
					placeholder="Unnamed Study Session"
				/>
			</div>
			<div className="mb-3">
				<label for="description" className="form-label">
					Description
				</label>
				<textarea
					className="form-control"
					id="description"
					name="description"
					rows={3}
					aria-describedby="descriptionHelp"
				></textarea>
				<div id="descriptionHelp" className="form-text">
					Add any useful info here!
				</div>
			</div>
			<div className="mb-3">
				<label for="location" className="form-label">
					Location
				</label>
				<input
					type="text"
					className="form-control"
					id="location"
					name="location"
					required="true"
					placeholder="Building and Room Number, or Online"
					aria-describedby="groupLocationHelp"
				/>
				<div id="groupLocationHelp" className="form-text">
					Be as specific as possible!
				</div>
			</div>
			<div className="mb-3">
				<label for="size" className="form-label">
					Group Size
				</label>
				<select
					className="form-select"
					id="size"
					name="size"
					aria-label="Session size selector"
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
				<div className="col-auto">
					<select
						className="form-select"
						id="startDate"
						name="startDate"
						aria-label="Session start day selector"
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
				<div className="col-auto">
					<select
						className="form-select"
						id="startTime"
						name="startTime"
						aria-label="Session start time selector"
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
				<div className="col-auto">
					<select
						className="form-select"
						id="endDate"
						name="endDate"
						aria-label="Session end day selector"
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
				<div className="col-auto">
					<select
						className="form-select"
						id="endTime"
						name="endTime"
						aria-label="Session end time selector"
					>
						{[...Array(24 * 4).keys()].map((index) => (
							<option value={index}>
								{getTimeBlock(index).toLocaleTimeString("en-US")}
							</option>
						))}
					</select>
				</div>
			</div>
			<button id="bookButton" type="submit" className="btn btn-primary">
				Book
			</button>
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

export default Form;
