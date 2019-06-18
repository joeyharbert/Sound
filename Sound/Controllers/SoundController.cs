using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using SoundApi.Models;

namespace SoundApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoundController : ControllerBase
    {
        private readonly SoundContext _context;


        public SoundController(SoundContext context)
        {
            _context= context;

            if (_context.Sounds.Count() == 0)
            {

                string[] files = Directory.GetFiles("./wwwroot/sounds/", "*.wav", SearchOption.TopDirectoryOnly);

                for (int i = 0; i < files.Length; i++)
                {
                    _ = _context.Sounds.Add(new SoundItem { url = files[i].Substring(9), title = files[i].Substring(17, files[i].Length - 21) });
                    _context.SaveChanges();
                }
            }
        }

        // GET: api/Sound
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoundItem>>> GetSounds()
        {
            return await _context.Sounds.ToListAsync();
        }

        // GET: api/Sound/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SoundItem>> GetSound(long id)
        {
            var sound = await _context.Sounds.FindAsync(id);

            if (sound == null)
            {
                return NotFound();
            }

            return sound;
        }
    }
}
