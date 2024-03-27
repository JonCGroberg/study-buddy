import getCourseColor from "../utils/color";
import formatAMPM from "../utils/time";

const Card = ({ cardData, userId }) => {
	let userAlreadyJoined = cardData.buddies
		.map((user: { id: any; }) => user.id)
		.includes(userId);
	const outlineColor = getCourseColor(cardData.course);

	return (
		<div
			className="card px-2 shadow-sm"
			style={{
				border: "0.1em solid " + outlineColor,
				borderLeft: "1em solid " + outlineColor
			}}
		>
			<Modal cardData={cardData} />
			<div className="card-body row px-3 py-2">
				<div className="col align-items-center py-3">
					<h6 className="col fw-bold py-0 py-0  ">
						<span>
							{cardData.course} {cardData.course_title}
							{cardData.name != "" ? " - " + cardData.name : ""}
						</span>
					</h6>
					<div className="row col-sm m-0  mt-2 ">
						<h6 className="small col-lg-auto col-auto bg-body-secondary align-content-center px-3 py-2 m-0  rounded-1 border me-3">
							Ends {formatAMPM(new Date(cardData.end)).toString()}
						</h6>
						<h6 className=" col-auto my-auto small text-secondary p-0 align-content-center ">
							{cardData.location}
						</h6>
					</div>
				</div>

				<div className="col-12 col-md-auto my-auto mb-4 my-auto">
					{!userAlreadyJoined ? (
						<JoinBtn cardData={cardData} />
					) : (
						<LeaveBtn cardData={cardData} />
					)}
					<button
						className="btn btn-sm p-2 text-primary fw-medium col-auto mx-auto "
						data-bs-toggle="modal"
						data-bs-target={"#modal-" + cardData.id}
					>
						More Details
					</button>
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
		className="btn-sm btn small btn-outline-primary ms-0 p-2 py-2 px-4 mx-2 me-4 fw-medium "
	>
		{"Join This Group (" + cardData.buddies.length}/
		{(cardData.max_buddies < 1 ? "∞" : cardData.max_buddies) + ")"}
	</button>
);

const LeaveBtn = ({ cardData }) => (
	<button
		onClick={() => handleLeave(cardData.id)}
		className="btn-sm btn small  btn-danger ms-0 p-2 py-2 px-4 mx-2 me-4 fw-medium "
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
