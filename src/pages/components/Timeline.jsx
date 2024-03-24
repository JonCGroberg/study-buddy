import { useState } from "react";
import "../styles/styles.css";
const Timeline = ({ studyGroups, userId }) => {
	return studyGroups.length == 0 ? (
        <div className="row gap-3 py-4 my-4 px-0 px-md-0 px-md-5 m-0 mx-lg-0 mx-md-5 text-center ">
            <div class="col-auto text-center w-100">
                <p>No Sessions Found</p>
                <a className="btn btn-primary" href="/book">Book one now!</a>
            </div>
        </div>
    ) : (
		<div className="row gap-3 py-4 my-4 px-0 px-md-0 px-md-5 m-0 mx-lg-0 mx-md-5 ">
			{studyGroups.map((sameHourGroups, index) => (
				<div key={index} className="">
					<h6 className="small w-100 border-1 border-bottom border-dark-subtle pb-2 mt-0 mb-4">
						{formatAMPM(new Date(sameHourGroups[0] * 1000)).toString()}
					</h6>
					<div className="small px-3 ps-sm-3 ps-lg-4 ms-sm-3 ms-lg-4 row gap-3">
						{sameHourGroups[1].map((group, index) => {
							// console.log(group);

							return <Card key={index} cardData={group} userId={userId} />;
						})}
					</div>
				</div>
			))}
		</div>
	);
};

const Card = ({ cardData, userId }) => {
	let userAlreadyJoined = false;
	const outlineColor = getCourseColor(cardData.course);

	for (const user of cardData.buddies) {
		userAlreadyJoined = user.id == userId ? true : userAlreadyJoined;
		console.log(user);
	}

	// console.log(userAlreadyJoined, cardData.buddies);
	return (
		<div
			className="card px-2 shadow-sm"
			style={{
				border: "0.1em solid " + outlineColor,
				borderLeft: "1em solid " + outlineColor
			}}
		>
			<div className="card-body row py-3">
				<div className="col">

					<h6 className="col py-1">
						<span>
							{cardData.course}
                            {" "}
                            {cardData.course_title}
                            {cardData.name != "" ? " - " + cardData.name : ""}
						</span>
					</h6>
					<div className="row col-sm m-0">
						<h6 className="small col-lg-auto col-12 bg-body-secondary align-content-center px-3 py-2 rounded-1 border ">
							Ends {formatAMPM(new Date(cardData.end)).toString()}
						</h6>
						<h6 className=" col-auto py-2 small text-secondary ">
							{cardData.location}
						</h6>
					</div>
				</div>

				<div className="col-12 col-md-auto my-auto">
					{!userAlreadyJoined ? (
						<button
							onClick={() => handleJoin(cardData.id)}
							className="btn-sm btn small btn-width  btn-outline-primary ms-0 p-2 py-2 px-4 mx-2 me-4 fw-medium "
						>
							{"Join This Group " + cardData.buddies.length}/
							{cardData.max_buddies}
						</button>
					) : (
						<button
							onClick={() => handleLeave(cardData.id)}
							className="btn btn-sm small btn-width  btn-outline-danger ms-0 p-2 px-4 mx-2 me-4 fw-medium "
						>
							{"Leave Group " + cardData.buddies.length}/{cardData.max_buddies}
						</button>
					)}
					<button className="btn btn-sm p-2 text-primary fw-medium ">
						More Details
					</button>
				</div>
			</div>
		</div>
	);
};

function handleLeave(groupID) {
	fetch("/api/leave", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ group: groupID })
	}).then((data) => {
		console.log(groupID);
		console.log(data);
		window.location.reload()
	});
}

function handleJoin(groupID) {
	fetch("/api/join", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ group: groupID })
	}).then((data) => {
		console.log(groupID);
		console.log(data);
		window.location.reload()
	});
}

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "PM" : "AM";
	const day = date.toLocaleString('en-us', {  weekday: 'long' });
	const today = new Date(Date.now()).toLocaleString('en-us', {  weekday: 'long' });

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;

	return `${hours}:${minutes} ${ampm} ${day == today ? "" : day}`;
}

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

export default Timeline;
