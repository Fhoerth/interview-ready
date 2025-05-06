// 6. *Animal Shelter*:

// An animal shelter, which holds only dogs and cats, operates on a strictly
// "first in, first out" basis. People must adopt either the "oldest"
// (based on arrival time) of all animals at the shelter,
// or they can select whether they would prefer a dog or a cat
// (and will receive the oldest animal of that type).
// They cannot select which specific animal they would like.
// Create the data structures to maintain this system and implement operations
// such as enqueue, dequeueAny, dequeueDog, and dequeueCat.
// You may use the built-in LinkedList data structure.

import { Queue } from "../ds/Queue";

export type AnimalType = "dog" | "cat";

export class Animal {
  type: AnimalType;

  constructor(type: AnimalType) {
    this.type = type;
  }
}

type AnimalWithId = {
  animal: Animal;
  id: number;
};

export default class AnimalShelter {
  #currentId = 0;

  #dogsQueue = new Queue<AnimalWithId>();
  #catsQueue = new Queue<AnimalWithId>();

  enqueue(type: AnimalType): void {
    const animal = new Animal(type);
    const id = this.#currentId++;
    const animalWithId = { animal, id };

    if (type === "dog") {
      this.#dogsQueue.enqueue(animalWithId);
    } else {
      this.#catsQueue.enqueue(animalWithId);
    }
  }

  dequeueAny(): Animal | undefined {
    const dog = this.#dogsQueue.peek();
    const cat = this.#catsQueue.peek();

    if (dog && cat) {
      return dog.id < cat.id ? this.dequeueDog() : this.dequeueCat();
    } else if (dog) {
      return this.dequeueDog();
    }

    return this.dequeueCat();
  }

  dequeueDog(): Animal | undefined {
    if (this.#dogsQueue.isEmpty()) return undefined;
    return this.#dogsQueue.dequeue()?.animal;
  }

  dequeueCat(): Animal | undefined {
    if (this.#catsQueue.isEmpty()) return undefined;
    return this.#catsQueue.dequeue()?.animal;
  }
}
