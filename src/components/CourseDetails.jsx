import React from 'react';

const CourseDetails = ({ course }) => {
  if (!course) {
    return null;
  }

  // Extract location info
  const address = course.location?.address || 'N/A';
  const city = course.location?.city || '';
  const state = course.location?.state || '';
  const country = course.location?.country || '';
  
  const fullAddress = address !== 'N/A' 
    ? `${address}, ${city}, ${state}, ${country}` 
    : 'Address not available';

  // Extract tee information - it's an array of tee objects
  const tees = course.tees || [];

  return (
    <div className="course-card">
      <h3 className="course-name">
        {course.course_name || course.club_name || 'Unnamed Course'}
      </h3>
      
      <div className="course-info">
        <div className="info-row">
          <strong>Club Name:</strong>
          <span>{course.club_name || 'N/A'}</span>
        </div>

        <div className="info-row">
          <strong>Address:</strong>
          <span>{fullAddress}</span>
        </div>

        <div className="info-row">
          <strong>City:</strong>
          <span>{city || 'N/A'}</span>
        </div>

        <div className="info-row">
          <strong>State:</strong>
          <span>{state || 'N/A'}</span>
        </div>

        {course.location?.latitude && (
          <div className="info-row">
            <strong>Coordinates:</strong>
            <span>
              {course.location.latitude}, {course.location.longitude}
            </span>
          </div>
        )}

        {/* Display Tee Information */}
        {tees.length > 0 && (
          <div style={{ marginTop: '20px', borderTop: '2px solid #f0f0f0', paddingTop: '15px' }}>
            <h4 style={{ color: '#2c5f2d', marginBottom: '15px' }}>⛳ Tee Information</h4>
            {tees.map((tee, index) => (
              <div key={index} style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '2px solid #e0e0e0'
              }}>
                <strong style={{ 
                  color: '#2c5f2d', 
                  fontSize: '1.1rem',
                  display: 'block',
                  marginBottom: '10px'
                }}>
                  {tee.tee_name || `Tee ${index + 1}`}
                </strong>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {tee.total_yards && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>📏 Total Yardage:</strong> {tee.total_yards} yards
                    </div>
                  )}
                  {tee.par_total && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>⛳ Par:</strong> {tee.par_total}
                    </div>
                  )}
                  {tee.number_of_holes && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>🕳️ Holes:</strong> {tee.number_of_holes}
                    </div>
                  )}
                  {tee.course_rating && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>📊 Course Rating:</strong> {tee.course_rating}
                    </div>
                  )}
                  {tee.slope_rating && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>📈 Slope Rating:</strong> {tee.slope_rating}
                    </div>
                  )}
                  {tee.bogey_rating && (
                    <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '4px' }}>
                      <strong>🎯 Bogey Rating:</strong> {tee.bogey_rating}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;