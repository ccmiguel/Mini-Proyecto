function showConsoleOutput() {
    function Person(name, age) {
        this.name = name;
        this.age = age;

        this.greet = function() {
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
    }

    let person1 = new Person("Alice", 30);
    let person2 = new Person("Bob", 25);    
    let person3 = new Person("Charlie", 35);

    person1.greet();
    console.log(person1.age); // 30

    console.log(person1);
    console.log(person2["age"]);

    person3.job = "Engineer";
    console.log(person3.job);
    person3.age = 36; 
    console.log(person3.age);
    delete person3.age;
    console.log(person3.age); // undefined

    let posts = [2, 4, 6, 8];
    console.log(posts[1]); // 4
}
