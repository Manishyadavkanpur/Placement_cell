let Student = require('../models/student')
let Company = require('../models/company')
module.exports.Studentpage =  function(req, res){
    

    return res.render('Student', {
        title: "student create"
    })
}

module.exports.Studentcreate = async function(req, res) {

    const { name, email, batch, collage, contect, dsa, forntend, react } = req.body;
	try {
		const student = await Student.findOne({ email });

		if (student) {
			console.log('Email already exists');
			return res.redirect('back');
		}

		const newStudent = await Student.create({
			name,
			email,
			collage,
			batch,
			contect,
			dsa,
			forntend,
			react,
		});
		await newStudent.save();

		return res.redirect('/');
	} catch (error) {
		console.log(`Error in creating student: ${error}`);
		return res.redirect('back');
	}
}
module.exports.deleteStudent = async function (req, res) {
	const { id } = req.params;
	try {
		// find the student using id in params
		const student = await Student.findById(id);
		// }
		await Student.findByIdAndDelete(id);
		res.redirect('back');
	} catch (error) {
		console.log('Error in deleting student');
		return res.redirect('back');
	}
};