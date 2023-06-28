let User = require('../models/user');
let Student = require('../models/student');
const fs = require('fs');
const fastcsv = require('fast-csv');

module.exports.SignIN = function(req, res){
    
        return res.render('Signin',{
                title: "Signin"
                // posts: posts
            })
    
}
module.exports.Signup = function(req, res){
    return res.render('Signup',{
        title: "Signup"
        // posts: posts
    })

}
module.exports.Home = async function (req, res) {
  const students = await Student.find({});
  console.log(students)
  return res.render('Home', { 
    all_users: students,
    title:'home'
   });
};

module.exports.create = async function(req, res) {
  console.log(req.body);

  if (req.body.password !== req.body.confrom_password) {
    return res.redirect('back');
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create({email: req.body.email, password: req.body.password, name: req.body.name});
      res.redirect('/');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Failed to create user', err);
    return res.redirect('back');
  }
}
module.exports.createSession = async function(req, res){
  return res.redirect('/');
}
module.exports.destroyession = async function(req, res){
  req.logout(
      function(err){
          if(err){
              console.log(err);
          }
      }
  );
  // req.flash('success', 'logout success');
  

  return res.redirect('/');
}
module.exports.downloadCsv = async function (req, res) {
	try {
		const students = await Student.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, College, Batch,Contect no, DSA Score, Forntend Score, React Score';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.collage +
				',' +
				student.batch +
				',' +
				student.contect +
				',' +
				student.dsa +
				',' +
				student.forntend +
				',' +
				student.react;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
				}
			}
			no++;
			csv += '\n' + data;
		}

		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
			console.log('Report generated successfully');
			return res.download('report/data.csv');
		});
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};