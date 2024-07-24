import React, { useRef } from "react";
import {
  motion,
  useScroll,
} from "framer-motion";
import LiIcon from "./LiIcon";


const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-primary dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (

      <div className="my-18">
        <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
          Experience
        </h2>

        <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
          <motion.div
            className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top  dark:bg-primaryDark dark:shadow-3xl"
            style={{ scaleY: scrollYProgress }}
          />
          <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
            <Details
              position="Senior Software Engineer"
              company="VNG"
              companyLink="https://www.vng.com.vn/"
              time="2022-Present"
              address="Ho Chi Minh City."
              work="Worked on a team responsible for supporting the development of features based on requirements from product owners and other related departments."
            />
            <Details
              position="Software Engineer"
              company="VNG"
              companyLink="https://www.vng.com.vn/"
              time="2021-2022"
              address="Ho Chi Minh City."
              work="Worked on a team responsible for supporting the development of features based on requirements from product owners and other related departments."
            />

            <Details
              position="Software Engineer"
              company="TMA Solutions"
              companyLink="https://www.tmasolutions.vn/"
              time="2018-2021"
              address="Ho Chi Minh City."
              work="Worked on a team responsible for supporting the development of features by collaborating with partners and gathering requirements from clients."
            />

            <Details
              position="Software Developer Intern"
              company="TMA Solutions"
              companyLink="https://www.tmasolutions.vn/"
              time="2017-2018"
              address="Ho Chi Minh City."
              work="Developed internal tools for company competitions, working on feature development and collaborating with partners while gathering requirements from clients."
            />

          </ul>
        </div>
        </div>
    );
};

export default Experience;
