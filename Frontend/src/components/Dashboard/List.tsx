import useFetchUser from "../../hooks/useFetch";

const List =()=> {
    const {list,error}= useFetchUser();

    return(
   <div className="p-8 bg-gray-50 min-h-screen w-full">
  {error && (
    <p className="text-red-500 text-center mb-6 font-medium" aria-live="assertive">
      {error}
    </p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...list].reverse().map((item, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-full"
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {item.name || 'Unnamed Applicant'}
            </h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
              #{index + 1}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">{item.email}</p>
        </div>

        {/* Core Info */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <p><span className="font-medium">Phone:</span> {item.phone || 'N/A'}</p>
          <p>
            <span className="font-medium">LinkedIn:</span>{' '}
            {item.linkedin ? (
              <a
                href={item.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
            ) : (
              'N/A'
            )}
          </p>
          <p>
            <span className="font-medium">Portfolio:</span>{' '}
            {item.portfolio ? (
              <a
                href={item.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            ) : (
              'N/A'
            )}
          </p>
          <p><span className="font-medium">Gender:</span> {item.gender || 'N/A'}</p>
          <p><span className="font-medium">Immediate Start:</span> {item.immediate === 'Yes' ? 'Yes' : 'No'}</p>
          <p><span className="font-medium">Start Date:</span> {item.startDate || 'N/A'}</p>
        </div>

        {/* Experience Section */}
        {item.reactExperience && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">React Experience</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{item.reactExperience}</p>
          </div>
        )}

        {/* Cover Letter Section */}
        {item.coverLetter && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Cover Letter</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{item.coverLetter}</p>
          </div>
        )}

        {/* Resume Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          {item.resume ? (
            <a
              href={item.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
            >
              View Resume
            </a>
          ) : (
            <span className="text-sm text-gray-400">No resume uploaded</span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>



    )
}
export default List;