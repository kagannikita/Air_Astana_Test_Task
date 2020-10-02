using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class FlightScheduleModel
    {
        [Key]
        [Required]
        public int FSId { get; set; }//id
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string StartCity { get; set; } // Город вылета
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string EndCity { get; set; } // Город прилета
        [DisplayFormat(DataFormatString = "dd MMM HH:mm", ApplyFormatInEditMode = true)]
        [Required]
        public DateTime StartDate { get; set; } // Дата вылета
        [DisplayFormat(DataFormatString = "dd MMM HH:mm", ApplyFormatInEditMode = true)]
        [Required]
        public DateTime EndDate { get; set; } // Дата прилета
        [DisplayFormat(DataFormatString = "HH:mm", ApplyFormatInEditMode = true)]
        public DateTime? Delay { get; set; } = null; // Задержка
    }

}
