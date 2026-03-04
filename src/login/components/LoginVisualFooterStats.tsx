export default function LoginVisualFooterStats() {
  return (
    <div className="pt-12 border-t border-white/10 grid grid-cols-3 gap-4">
      {[
        { label: 'שאלות', value: '10K+' },
        { label: 'משתמשים', value: '2K+' },
        { label: 'דירוג', value: '4.9' },
      ].map((stat, index) => (
        <div key={index} className="text-center space-y-1">
          <div className="text-2xl font-black text-white">{stat.value}</div>
          <div className="text-[10px] text-cyan-400/70 font-bold uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
