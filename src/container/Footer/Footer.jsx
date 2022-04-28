import React, {useState, useEffect} from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client';


import './Footer.scss';

const Footer = () => {
	const [formData, setFormData] = useState({name: '', email: '', message: ''});
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { username, email, message } = formData;
	const handlChengeInput = (e) => {
		const { name, value } = e.target;

		setFormData({...formData, [name]: value});
	}

	const handlSubmit = () => {
		setLoading(true);

		const contact = {
			_type: 'contact',
			name: formData.username,
			email: formData.email,
			message: formData.message,
		}

		client.create(contact)
			.then(() => {
				setLoading(false);
				setIsFormSubmitted(true)
			}).catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<h2 className="head-text">Take a coffee & chat with me</h2>

			<div className='app__footer-cards'>
				<div className="app__footer-card">
					<img src={images.email} alt="email" />
					<a href="mailto:business.homeit@gmail.com" className='p-text'>business.homeit@gmail.com</a>
				</div>
				<div className="app__footer-card">
					<img src={images.mobile} alt="mobile" />
					<a href="tel:+700000000" className='p-text'>+700000000</a>
				</div>
			</div>
			{!isFormSubmitted ?
				<div className="app__footer-form app__flex">
					<div className="app__flex">
						<input type="text" className='p-text' placeholder='Youre Name' value={username} name="username" onChange={handlChengeInput}/>
					</div>
					<div className="app__flex">
						<input type="email" className='p-text' placeholder='Youre Email' value={email} name='email' onChange={handlChengeInput}/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Youre Message'
							value={message}
							name="message"
							onChange={handlChengeInput}
						/>
					</div>
					<button type='button' className='p-text' onClick={handlSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
				</div>
				: <div>
					<h3 className='head-text'>Thank you for getting touch</h3>
				</div>
			}
		</>
	);
}

export default AppWrap(
	MotionWrap(Footer, 'app__footer'),
	'contact',
	'app__whitebg'
);