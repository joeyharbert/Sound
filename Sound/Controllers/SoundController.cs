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


                string[] directories = Directory.GetDirectories("./wwwroot/sounds/");

                for (int x = 0; x < directories.Length; x++)
                {
                    string[] files = Directory.GetFiles(directories[x], "*.wav", SearchOption.TopDirectoryOnly);
                    string type = directories[x].Substring(9);
                    for (int i = 0; i < files.Length; i++)
                    {
                        string url = files[i].Substring(9);
                        int titleStartIndex = url.IndexOf('/', 8) + 1;
                        //I really want to put titleEndex but like... I feel like it would be confusing when you read it for the first time. But I think it's funny.
                        int titleEndIndex = url.IndexOf('.', url.Length - 5);
                        string title = url.Substring(titleStartIndex, titleEndIndex - titleStartIndex);
                        _ = _context.Sounds.Add(new SoundItem { url = url, title = title, type = type });
                        _context.SaveChanges();
                    }
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
