function GetCatalyst() {
    $.ajax({
		url: `/server/try_function/all`, //Ensure that 'to_do_list_function' is the package name of your function.
		success: function (data) {
			const {data: { column}} = data;
            
            console.log(`Catalyst:`, column);
		},
		error: function (err) {
			console.log(err);
		}
	});

}
function InputData() {
    let inputValue = document.getElementById('ROwONe').value;
	let Row_Two = document.getElementById('Row_Two').value;
    let Body = { Row_One: inputValue,Row_Two:Row_Two };
	// let Body =inputValue;
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: `/server/try_function/add`,
        data: JSON.stringify({Body}),
        success: function (response) {
            const { data: { reqBody } } = response;
            console.log(reqBody);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
