import { topics } from './src/data/topics.js';


function Topic() {
    const topic = topics.map((topic) => topic.id);
    console.log(topic);
}

Topic();