export default function SkillCard({ skill }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-dark-800 border border-dark-700 rounded-xl hover:border-dark-600 transition group">
      {skill.icon ? (
        <img src={skill.icon} alt="" className="w-8 h-8" />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
          {skill.name?.charAt(0)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-200 truncate">{skill.name}</p>
        {skill.level !== undefined && (
          <div className="w-full bg-dark-700 rounded-full h-1.5 mt-1.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        )}
      </div>
      {skill.level && (
        <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
      )}
    </div>
  );
}