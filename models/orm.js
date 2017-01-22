function BaseModel(...args) {
	console.log(arguments);
	this.create = function(arguments) {
		arguments.forEach((arg) => {
			this.arg = arg;
		});
		//database.write;
	};

	this.delete = function(this) {
		//database.delete(this);
	};

	this.get = function(arguments) {
		//database.select();
	};

	this.filter = function(arguments) {
		// database select();
	};
};