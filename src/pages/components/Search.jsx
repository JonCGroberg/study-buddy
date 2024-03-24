const Search = () => {
	return (
		<>
			<div class="container mt-5">
                <div class="">
                    <input
                        type="text"
                        class="form-control"
                        placeholder=""
                    />
                </div>

				<select
                    size={5}
					class=" form-select "
					multiple
				>
					<option value="1">COP1200</option>
					<option value="2">MAC2000</option>
					<option value="3">COP1100</option>
					<option value="4">COP1000</option>
                    <option value="5">COP1400</option>
					<option value="6">MAC2300</option>
					<option value="7">COP3200</option>
					<option value="8">COP4200</option>
				</select>
			</div>
		</>
	);
};

export default Search;
