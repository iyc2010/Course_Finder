import React, { useState, useEffect } from 'react';
import CourseDetails from './CourseDetails';

const CourseList = ({ location }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // First, search for courses
      const response = await fetch(
        `http://localhost:3001/api/courses/search?city=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Then fetch detailed info for each course
      if (data.courses && data.courses.length > 0) {
        const detailedCourses = await Promise.all(
          data.courses.map(async (course) => {
            try {
              const detailResponse = await fetch(
                `http://localhost:3001/api/courses/${course.id}`
              );
              if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                console.log('Detail data for course:', detailData);
                return detailData;
              }
              console.log('Detail fetch failed, using basic data');
              return course;
            } catch (err) {
              console.error('Error fetching course details:', err);
              return course;
            }
          })
        );
        setCourses(detailedCourses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchCourses(location);
    }
  }, [location]);

  if (loading) {
    return <div className="loading">Loading golf courses...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error loading courses: {error}</p>
      </div>
    );
  }

  return (
    <div className="course-list">
      {courses.length === 0 ? (
        <p className="no-results">No courses found for "{location}"</p>
      ) : (
        <>
          <h2 className="results-title">
            Found {courses.length} course(s) in {location}
          </h2>
          {courses.map((course, index) => (
            <CourseDetails key={course.id || index} course={course} />
          ))}
        </>
      )}
    </div>
  );
};

export default CourseList;