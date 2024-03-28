import type { Key } from "react";
import "../styles/styles.css";
import {formatAMPM} from "../utils/time";
import Card from "./Card";

const Timeline = ({ studyGroups, userId }) => (
	<div className="row gap-3 py-4 my-4 px-0 px-md-0 px-md-5 m-0 mx-lg-0 mx-md-5">
		{studyGroups.length == 0 ? (
			<BookSession />
		) : (
			studyGroups.map((sameHourGroups: any[][], index: Key) => (
				<div key={index}>
					<CardGroupHeader sameHourGroups={sameHourGroups} />
					<CardGroup userId={userId} sameHourGroups={sameHourGroups} />
				</div>
			))
		)}
	</div>
);

const BookSession = () => (
	<div
		className="col-auto text-center w-100 mx-auto card p-5 text-center "
		style={{ maxWidth: 400 }}
	>
		<div className="card-body">
			<p>No Sessions Found</p>
			<a className="btn btn-primary" href="/book">
				Book one now!
			</a>
		</div>
	</div>
);

const CardGroupHeader = ({ sameHourGroups }) => (
	<h6 className="small w-100 border-1 border-bottom border-dark-subtle pb-2 mt-0 mb-4">
		{formatAMPM(new Date(Number(sameHourGroups[0]) * 1000)).toString()}
	</h6>
);

const CardGroup = ({ userId, sameHourGroups }) => (
	<div className="small px-3 ps-sm-3 ps-lg-4 ms-sm-3 ms-lg-4 row gap-3">
		{sameHourGroups[1].map((group: any, index: Key) => {
			return <Card key={index} cardData={group} userId={userId} />;
		})}
	</div>
);

export default Timeline;
