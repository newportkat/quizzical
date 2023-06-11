import React from "react";

const TitlePage = (props) => {
	return (
		<section className="title-page">
			<h1 className="title">Quizzical</h1>
			<h3 className="subtitle">Let's get quizzical baby!</h3>
			<button
				className="start-btn btn"
				onClick={() => {
					props.changePage("questions-page");
				}}
			>
				Start quiz
			</button>
		</section>
	);
};

export default TitlePage;
