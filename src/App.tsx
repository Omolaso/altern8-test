import { useEffect, useState, useMemo } from "react";
import "./App.css";
import axios from "axios";

interface IDataResponse {
	id: number;
	name: string;
}

function App() {
	const [data, setData] = useState<IDataResponse[]>([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		try {
			axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
				// console.log(res.data)
				setData(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [data]);

	const filteredData = useMemo(() => {
		return data.filter((item: IDataResponse) =>
			item.name.toLowerCase().includes(filter.toLowerCase())
		);
	}, [data, filter]);

	const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<div className="App">
			<input type="text" value={filter} onChange={(e) => searchData(e)} />

			{filteredData ? (
				<ul>
					{filteredData?.map((item: IDataResponse) => (
						<li key={item.id}>
							{item.id} - {item.name}
						</li>
					))}
				</ul>
			) : (
				"No data"
			)}
		</div>
	);
}

export default App;
