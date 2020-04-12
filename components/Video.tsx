interface VideoProps {
  youtube_url: string;
}

const getID = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    throw 'error parsing url';
  }
};

const Video: React.FC<VideoProps> = ({ youtube_url }) => {
  return (
    <div>
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${getID(youtube_url)}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

export default Video;
