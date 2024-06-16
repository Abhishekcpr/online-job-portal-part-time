const { GoogleGenerativeAI } = require("@google/generative-ai");


const geminiResponse =async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        console.log(prompt);
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    
        res.status(200).send({
          bot: text
        });

    
      } 
    catch(err)
    {
        res.status(400).send("unable to connect due to" + err)
    }
}

module.exports = {geminiResponse}