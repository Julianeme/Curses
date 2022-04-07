const somethingWillHappen = () => {
	return new Promise((resolve, reject) => {
		if (true) {
			resolve("Hey we did it!");
		} else {
			reject("whooops, it failed")
		}
	})
}

somethingWillHappen()
	.then(response=>console.log(response))
	.catch(error=>console.log(error));

const someThingWillHappen2 = () => {
	return new Promise((resolve, reject) => {
		if(true) {
			setTimeout(()=>{
				resolve("True");
			}, 2000)
		} else {
			/*by instancing the error it will return all error
			 tracing info besides the error message*/
			const error = new Error("Whooops failed again");
			reject(error)
		}
	})
	}

	someThingWillHappen2()
		.then(response =>console.log(response))
		.catch(error => console.log(error));

/*We can execute all promises we have, at the same time with
promise.all()*/

Promise.all([someThingWillHappen2(), somethingWillHappen()])
	.then(response => {console.log("array of resutls", response);
})
	.catch(err => {console.error(err)});