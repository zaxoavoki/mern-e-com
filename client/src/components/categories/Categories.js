import React from "react";
import faker from "faker";
import { Link } from "react-router-dom";

function Categories() {
	const categories = Array.from({ length: 10 }, (e) => {
		return {
			id: faker.random.uuid(),
			name: faker.commerce.productMaterial(),
			description: faker.commerce.productDescription(),
		};
	});

	return (
		<div className="row">
			<div className="col-12 mb-4">
				<h3>Categories</h3>
			</div>
			{categories.map((cat) => {
				return (
					<div key={cat.id} className="col-3">
						<div className="card mb-3">
							<div className="card-body">
								<Link to={`/categories/${cat.id}`}>
									<h5>{cat.name}</h5>
								</Link>
								<p>{cat.description}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Categories;
