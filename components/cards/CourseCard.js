// import {Card, Badge} from 'antd';
// import {currencyFormatter} from '../../utils/helpers';

// const {Meta} = Card;

// const CourseCard = ({course}) =>{
//     const { name, instructor, price, image, slug, paid, category} = course;
//     return <a href={`/course/${slug}`}>
//         <Card
//            className="mb-4"
//            cover={
//                <img 
//                   src={image.Location}
//                   alt={name}
//                   style={{height: "200px",  objectFit:"cover"}}
//                   className="p-1"
//                 />
//            }
//         >
//             <h2 className="font-weight-bold">{name}</h2>
//             <p>by {instructor.name}</p>
//             <Badge 
//                count={category} 
//                style={{backgroundColor : "#03a9f4"}}
//                className="pb-2 mr-2"
//             />
//             <h4 className="pt-2"> {paid ? currencyFormatter({
//                 amount: price,
//                 currency: "inr",
//             }) : "Free"}</h4>
//         </Card>
//     </a>
// };

// export default CourseCard;

import { Card, Badge } from 'antd';
import { currencyFormatter } from '../../utils/helpers';

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  return (
    <a href={`/course/${slug}`}>
      <Card
        className="mb-4 course-card"
        cover={
          <img
            src={image.Location}
            alt={name}
            className="course-card-image"
          />
        }
      >
        <div className="course-card-content">
          <h3 className="course-card-title">{name}</h3>
          <p className="course-card-instructor">by {instructor.name}</p>
          <Badge
            count={category}
            style={{ backgroundColor: '#03a9f4' }}
            className="pb-2 mr-2"
          />
          <h4 className="course-card-price">
            {paid ? currencyFormatter({ amount: price, currency: 'inr' }) : 'Free'}
          </h4>
        </div>
      </Card>
    </a>
  );
};

export default CourseCard;

