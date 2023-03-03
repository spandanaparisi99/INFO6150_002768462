$(document).ready(function(){
    var username;

	// Page 1 Form Submission
	$("#submit").click(function(){
		var email = $("#email").val();
		username = $("#username").val();
		var password = $("#password").val();

		// Null Check
		if(email == '' || username == '' || password == ''){
			$("#error").html("Please fill all the fields");
			return false;
		}

		// Email Validation
		var email_regex = /^[A-Za-z0-9._%+-]+@(northeastern)+\.edu$/;
		if(!email_regex.test(email)){
			$("#error").html("Please enter a valid Northeastern email id");
			return false;
		}

		// Username Validation
		var username_regex = /^[A-Za-z0-9]+$/;
		if(!username_regex.test(username)){
			$("#error").html("Username should only contain alphanumeric characters");
			return false;
		}

		// Password Validation
		var password_regex = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
		if(!password_regex.test(password)){
			$("#error").html("Password should be 6 to 20 characters long and contain only alphanumeric characters and special characters !@#$%^&*()_");
            return false;
        }

		// Successful validation, store username in session storage and redirect to page 2
        alert("Successfully Logged In");
		sessionStorage.setItem("username", username);
		window.location.href = "calc.html";
	});

	// Page 2 Functionality
	$("#welcomeMsg").html("Welcome " + sessionStorage.getItem("username"));

	// Calculator Operation
	const calculator = (num1, num2, operator) => {
        let result = 0;
        switch(operator) {
        case 'add':
        result = num1 + num2;
        break;
        case 'subtract':
        result = num1 - num2;
        break;
        case 'multiply':
        result = num1 * num2;
        break;
        case 'divide':
        result = num1 / num2;
        break;
        default:
        result = 0;
        }
        return result;
        };
        
        // Button Click Events
        $("#add").click(() => {
        const num1 = parseInt($("#num1").val());
        const num2 = parseInt($("#num2").val());
        if(isNaN(num1)){
        $("#error1").html("Please enter valid numbers");
        return false;
        } else {
            $("#error1").html(" ");
        }
        if(isNaN(num2)){
            $("#error2").html("Please enter valid numbers");
            return false;
            } else {
                $("#error2").html(" ");
            }
        const operator = 'add';
        const result = calculator(num1, num2, operator);
        $("#result").val(result);
        });
        
        $("#subtract").click(() => {
        const num1 = parseInt($("#num1").val());
        const num2 = parseInt($("#num2").val());
        if(isNaN(num1)){
            $("#error1").html("Please enter valid numbers");
            return false;
            } else {
                $("#error1").html(" ");
            }
            if(isNaN(num2)){
                $("#error2").html("Please enter valid numbers");
                return false;
                } else {
                    $("#error2").html(" ");
                }
        const operator = 'subtract';
        const result = calculator(num1, num2, operator);
        $("#result").val(result);
        });
        
        $("#multiply").click(() => {
        const num1 = parseInt($("#num1").val());
        const num2 = parseInt($("#num2").val());
        if(isNaN(num1)){
            $("#error1").html("Please enter valid numbers");
            return false;
            } else {
                $("#error1").html(" ");
            }
            if(isNaN(num2)){
                $("#error2").html("Please enter valid numbers");
                return false;
                } else {
                    $("#error2").html(" ");
                }
        const operator = 'multiply';
        const result = calculator(num1, num2, operator);
        $("#result").val(result);
        });
        
        $("#divide").click(() => {
        const num1 = parseInt($("#num1").val());
        const num2 = parseInt($("#num2").val());
        if(isNaN(num1)){
            $("#error1").html("Please enter valid numbers");
            return false;
            } else {
                $("#error1").html(" ");
            }
            if(isNaN(num2)){
                $("#error2").html("Please enter valid numbers");
                return false;
                } else {
                    $("#error2").html(" ");
                }
        const operator = 'divide';
        const result = calculator(num1, num2, operator);
        $("#result").val(result);
        });

        $("#reset").click(() => {
            $("#result").val("");
        });

});

