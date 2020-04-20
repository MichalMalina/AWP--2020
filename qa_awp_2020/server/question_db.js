class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            ques: String,
            answ: [{text:String , vote:Number}] // A list of hobbies as string
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);

    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }









    async addAnswer(questionId, answer ) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);


        question.answ.push(answer);
        return await question.save();
    }



    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    /*
    async bootstrap(count = 10) {
        const q1 = new this.questionModel({
            ques: "bam",
            answ: [{text:"ddddddd" , vote:2}]
        });

        // Let's save it.
        try {
            let savedQ1 = await q1.save();

            console.log("Questions saved.", savedQ1);
        } catch(error) { // Error handling in case it doesn't save
            console.error(error);
        }
    }
    */
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);