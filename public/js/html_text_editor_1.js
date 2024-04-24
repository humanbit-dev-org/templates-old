const buttons = document.querySelectorAll('button');
// textField.document.designMode = "on";
// textField.document.contentEditable = "true";


for (let i=0; i<buttons.length; i++){
	buttons[i].addEventListener('click', ()=>{
		let cmd = buttons[i].getAttribute('data-cmd');
		if(buttons[i].name === "active"){
			buttons[i].classList.toggle('active');
		}

		if (cmd === "createLink") {
			let url = prompt("Enter link here: ", "test");
			textField.document.execCommand(cmd, false, url);

			const links = textField.document.querySelectorAll('a');
			links.forEach(item =>{
				item.target = "_blank";
				item.addEventListener('mouseover', ()=>{
					textField.document.designMode = "Off";
				});

				item.addEventListener('mouseout', ()=>{
					textField.document.designMode = "On";
				});

			});

		}else{
			textField.document.execCommand(cmd, false, null);
		}
	})
};
