const Timeline = ({ studyGroups }) => {
	console.log(studyGroups);
	return (
		<div className="row gap-3 py-4 my-4 px-0 px-md-0 px-md-5 m-0 mx-lg-0 mx-md-5 ">
			{studyGroups.map((sameHourGroups) => (
				<div className="">
					<h6 className="w-100 border-1 border-bottom border-dark-subtle pb-2 mt-0 mb-4">
						{formatAMPM(new Date(sameHourGroups[0] * 1000)).toString()}
					</h6>
					<div className="px-3 ps-sm-3 ps-lg-5 ms-sm-3 ms-lg-5 row gap-3">
						{sameHourGroups[1].map((group, index) => {
							console.log(group);

							return (
								<>
									<Card key={index} cardData={group} />
								</>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

const Card = ({ cardData }) => {
	// console.log(cardData);
	return (
		<div className="card p-2">
			<div className="card-body row">
				<div className="col ">
					{" "}
					<h4 className="col">
						<span>
							{cardData.course}
							{cardData.name ? " - " + cardData.name : ""}
						</span>
					</h4>{" "}
					<div className="row col-sm m-0">
						<h6 className="col-auto bg-secondary-subtle rounded-2 py-2">
							Ends {formatAMPM(new Date(cardData.end)).toString()}
						</h6>
						<h6 className="col-auto py-2">{cardData.location}</h6>
					</div>
				</div>

				<div className="col-12 col-md-auto my-auto">
					<button className="btn btn-outline-primary p-2 px-3 mx-2 me-4 fw-medium ">
						Join This Group ({cardData.buddies.length}/{cardData.max_buddies})
					</button>
					<button className="btn p-2 text-primary fw-medium ">
						More Details
					</button>
				</div>
			</div>
		</div>
	);
};

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "PM" : "AM";
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	const day = weekDays[date.getDay()];
	const today = weekDays[new Date(Date.now()).getDay()];

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;

	return `${hours}:${minutes} ${ampm} ${day == today ? "" : day}`;
}

export default Timeline;
