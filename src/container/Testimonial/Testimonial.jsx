import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
	const [brands, setBrands] = useState([]);
	const [testimonials, setTestimonials] = useState([]);
	const [currenIndex, setCurrenIndex] = useState(0);

	const handlClick = (index) => {
		setCurrenIndex(index)
	}

  useEffect(() => {
	const quary = '*[_type == "testimonials"]';
	const brandsQuary = '*[_type == "brands"]';

	client.fetch(quary)
		.then((data) => {
			setTestimonials(data);
		}).catch((err) => {
			
		});
	client.fetch(brandsQuary)
		.then((data) => {
			setBrands(data);
		}).catch((err) => {
			
		});
	}, []);

	const test = testimonials[currenIndex];

  return (
	<>
		{testimonials.length && (
			<>
				<div className="app__testimonials-item app__flex">
					<img src={urlFor(test.imageurl)} alt="testimonial"/>
					<div className='app__tetimonial-content'>
						<p className="p-text">{test .feedback}</p>
						<div>
							<h4 className="bold-text">{test.name}</h4>
							<h5 className="p-text">{test.company}</h5>
						</div>
					</div>
				</div>
				<div className="app__testimonial-btns app__flex">
					<div 
						className="app__flex"
						onClick={() => handlClick(currenIndex === 0 ? testimonials.length - 1 : currenIndex - 1)}>
							<HiChevronLeft/>
					</div>
					<div 
						className="app__flex"
						onClick={() => handlClick(currenIndex === testimonials.length - 1 ? 0 : currenIndex + 1)}>
							<HiChevronRight/>
				</div>
				</div>
			</>
		)}
		<div className="app__testimonial-brands app__flex">
			{brands.map((brand) => (
				<motion.div
					whileInView={{opacity: [0, 1]}}
					transition={{duration: 0.5, type: 'tween'}}
					key={brand._id}
				>
					<img src={urlFor(brand.imgUrl)} alt={brand.name}/>
				</motion.div>
			))}
		</div>
	</>
  );
}

export default AppWrap(
	MotionWrap(Testimonial, 'app__testimonials'),
	'testimonials',
	"app__primarybg");