import './Details.css'

const Details = () => {
    return (
        <section className='detail-main'>
          <img className='cg-image' src='https://www.nps.gov/common/uploads/structured_data/3FAA6E89-1DD8-B71B-0B170E56BD4ED00D.jpg' alt='campground hero shot' />
          <div className='cg-name'>
            <h2>Aspenglen Campground</h2>
          </div>
          <section className='cg-desc-section'>
            <p className='cg-desc' >Aspenglen Campground is reservation only. Visit Recreation.gov. Aspenglen opens for the 2023 season on May 26. Timed Entry Permits are included with your camping reservation. For Aspenglen Campers, your reservation includes access to Bear Lake Road. Campers will be able to initially enter the park beginning at 1 p.m. on the first day of your camping reservation. If you plan to enter the park earlier in the day, you will have to enter the park outside of the times when Timed Entry Permits are in effect.</p>
          </section>
          <section className='cg-map-section'>
            <img className='cg-map' src='/assets/Screenshot 2023-03-26 at 12.14.46 PM.png' alt='campground map'/>
          </section>
          <section className='cg-details-section'>
            <div className='cg-details-header'>
              <h3>Campground Info</h3>
              <hr className='divider-cg-info' />
            </div>
            <div className='cg-details-copy'>

            </div>
          </section>
        </section>
    )
}

export default Details