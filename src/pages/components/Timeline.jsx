const Timeline = ({ studyGroups }) => {
	console.log(studyGroups);
	return (
		<div className="p-5 row gap-3 mx-5">
			{studyGroups.map((timeSet) => {
				return (
					<div className="">
						<h6 className="w-100 border-1 border-bottom border-dark-subtle pb-2 mt-0 mb-4">
							{new Date(timeSet[0]*1000).toString()}
						</h6>
						<div className="ps-5 ms-5 row gap-3">
							{timeSet[1].map((group, index) => (
								<Card key={index} cardData={group} />
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

const Card = ({ cardData }) => {
	console.log(cardData);
	return (
		<div className="card">
			<div className="card-body row">
				<div className="col ">
					{" "}
					<h3 className="col">
						<span>
							{cardData.course}
							{cardData.name ? " - " + cardData.name : ""}
						</span>
					</h3>{" "}
					<div className="row col-sm m-0">
						<h6 className="col-auto bg-secondary-subtle rounded-2 py-2">
							Ends at {new Date(cardData.end*1000).toString()} & 1 hr 25 min
							remaining
						</h6>
						<h6 className="col-auto py-2">{cardData.location}</h6>
					</div>
				</div>

				<div className="col-12 col-md-auto my-auto">
					<button className="btn btn-primary p-2 mx-2">
						Join This Group({cardData.buddies.length}/{cardData.max_buddies})
					</button>
					<button className="btn p-2">More Details</button>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
