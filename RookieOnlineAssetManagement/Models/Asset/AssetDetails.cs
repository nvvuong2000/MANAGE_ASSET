using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetDetails : AssetsListViewModel
    {
        public DateTime InstalledDate { get; set; }
        public string Specification { get; set; }
        public List<DateTime> Date { get; set; }
        public List<string> AssignedTo { get; set; }
        public List<string> AssignedBy { get; set; }
        public List<DateTime> ReturnedDate { get; set; }

    }
}
