import getCourseColor from "../utils/color";
import {formatAMPM} from "../utils/time";

const Card = ({ cardData, userId }) => {
	let userAlreadyJoined = cardData.buddies
		.map((user: { id: any; }) => user.id)
		.includes(userId);
	const outlineColor = getCourseColor(cardData.course);

	return (
		<div
			className="card px-2 shadow-sm py-1"
			style={{
				border: "0.1em solid " + outlineColor,
				borderLeft: "1em solid " + outlineColor
			}}
		>
			<Modal cardData={cardData} />
			<div className="card-body row px-3 py-3">
				<div className="col align-items-center py-md-0 py-2">
					<h6 className="col fw-bold py-0 py-0  ">
						<span>
							{cardData.course} {cardData.course_title}
							{cardData.name != "" ? " - " + cardData.name : ""}
						</span>
					</h6>
					<div className="row col-sm m-0  mt-2 gap-2">
						<h6 className="small col-lg-auto col-auto my-auto  bg-body-secondary align-content-center px-3 py-2 rounded-1 border">
							Ends {formatAMPM(new Date(cardData.end)).toString()}
						</h6>
						<h6 className=" col-auto my-auto small text-secondary h-100 align-content-center ">
							{cardData.location}
						</h6>
					</div>
				</div>

				<div className="col-12 col-md-auto my-auto my-auto  align-items-center px-4">
					<div className="row gap-2">
						{!userAlreadyJoined ? (
							<JoinBtn cardData={cardData} />
						) : (
							<LeaveBtn cardData={cardData} />
						)}
						<button
							className="btn btn-sm p-2 btn-outline  fw-medium col"
							data-bs-toggle="modal"
							data-bs-target={"#modal-" + cardData.id}
						>
							More Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Modal = ({ cardData }) => (
	<div
		className="modal fade"
		id={"modal-" + cardData.id}
		tabIndex={-1}
		aria-labelledby={"modal-label-" + cardData.id}
		aria-hidden="true"
	>
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5" id={"modal-label-" + cardData.id}>
						{cardData.course + " - " + cardData.course_title}{" "}
					</h1>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div className="modal-body">
					{cardData.name != "" && (
						<p>
							<strong>Name:</strong> {cardData.name}
						</p>
					)}
					{cardData.description != "" && (
						<p>
							<strong>Description:</strong>
							<br />
							{cardData.description}
						</p>
					)}
					<p>
						<strong>Location:</strong> {cardData.location}
					</p>
					<p>
						<strong>Start:</strong> {new Date(cardData.start).toLocaleString()}
					</p>
					<p>
						<strong>End:</strong> {new Date(cardData.end).toLocaleString()}
					</p>
					<p>
						<strong>Group Size:</strong>{" "}
						{cardData.max_buddies < 1 ? "unlimited" : cardData.max_buddies}
					</p>
					<p>
						<strong>Group:</strong>{" "}
						{cardData.buddies.map((buddy) => buddy.name).join(", ")}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const JoinBtn = ({ cardData }) => (
	<button
		onClick={() => handleJoin(cardData.id)}
		className="btn-sm btn small btn-outline-primary ms-0 p-2 py-2 px-3 mx-2 fw-medium  col-12 col-sm w-auto btn-width"
	>
		{"Join This Group (" + cardData.buddies.length}/
		{(cardData.max_buddies < 1 ? "∞" : cardData.max_buddies) + ")"}
	</button>
);

const LeaveBtn = ({ cardData }) => (
	<button
		onClick={() => handleLeave(cardData.id)}
		className="btn-sm btn small btn-danger ms-0 p-2 py-2 px-3 mx-2 fw-medium  col-12 col-sm w-auto btn-width"
	>
		{"Leave This Group (" + cardData.buddies.length}/
		{(cardData.max_buddies < 1 ? "∞" : cardData.max_buddies) + ")"}
	</button>
);

const handleLeave = (groupID: string) =>
	fetch("/api/leave", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ group: groupID })
	}).then((res) => {
		if (res.ok) window.location.reload();
	});

const handleJoin = (groupID: string) =>
	fetch("/api/join", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ group: groupID })
	}).then((res) => {
		if (res.ok) window.location.reload();
	});

export default Card;
