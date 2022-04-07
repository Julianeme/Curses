const doSomethingAsync = () => {
	return new Promise((resolve, reject) => {
		(true)? setTimeout(()=> {resolve("I just did something async")}, 3000)
		: reject(new Error("ERROR: I just failed something async"));
	})
}

const doSomething = async () => {
	const something = await doSomethingAsync();
	console.log(something)
}

console.log("before");
doSomething();
console.log("after");

const anotherFunction = async () => {
	try {
		const something = await doSomethingAsync();
		console.log(something);

	} catch(error) {
		console.log(error);
	}
}

console.log("before 2");
anotherFunction();
console.log("after 2");