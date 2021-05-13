using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models.Asset
{
    public class MultipleFilter
    {
        public List<int> categories { get; set; }
        public List<int> states { get; set; }
    }
}